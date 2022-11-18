import { readFile, writeFile } from 'fs'
import { argv } from 'process'

readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    throw Error
  }
  updateVersion(JSON.parse(data))
})

const updateVersion = (fileData) => {
  if (argv.length >= 3) {
    const env = argv[2]
    if (env === 'production' || env === 'develop') {
      const versioning = fileData[env].versioning
      const command = versioning.versionChangeOnUpload
      let newVersion
      let [major, minor, patch] = fileData.version.split('.')
      if (!!command && versioning.useAutomaticVersioning) {
        switch (command) {
          case 'major':
            newVersion = parseInt(major) + 1
            if (versioning.resetLower) {
              minor = 0
              patch = 0
            }
            fileData.version = [newVersion.toString(), minor, patch].join('.')
            break
          case 'minor':
            newVersion = parseInt(minor) + 1
            if (versioning.resetLower) {
              patch = 0
            }
            fileData.version = [major, newVersion.toString(), patch].join('.')
            break
          case 'patch':
            newVersion = parseInt(patch) + 1
            fileData.version = [major, minor, newVersion.toString()].join('.')
            break
          default:
            throw `ERROR: Must use correct command for "${env}.versionChangeOnUpload"`
        }
      }
      writeFile('config.json', JSON.stringify(fileData, null, 2), (err) => {
        if (err) {
          console.log(err)
          throw Error
        }
      })
    } else {
      throw `ERROR: Must add either "production" or "develop" (without quotes) as an argument. e.g. "node version.mjs production"`
    }
  }
}
