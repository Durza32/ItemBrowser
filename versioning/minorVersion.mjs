import * as fs from 'node:fs'

fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    throw Error
  }
  updateMinorVersion(JSON.parse(data))
})

const updateMinorVersion = (fileData) => {
  const [major, minor, patch] = fileData.version.split('.')
  let intMinor = parseInt(minor)
  intMinor += 1
  const newVersion = [major, intMinor.toString(), '0']
  fileData.version = newVersion.join('.')
  fs.writeFile('config.json', JSON.stringify(fileData, null, 2), (err) => {
    if (err) {
      console.log(err)
      throw Error
    }
  })
}
