import * as fs from 'node:fs'

fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    throw Error
  }
  updatePatchVersion(JSON.parse(data))
})

const updatePatchVersion = (fileData) => {
  const [major, minor, patch] = fileData.version.split('.')
  let intPatch = parseInt(patch)
  intPatch += 1
  const newVersion = [major, minor, intPatch.toString()]
  fileData.version = newVersion.join('.')
  fs.writeFile('config.json', JSON.stringify(fileData, null, 2), (err) => {
    if (err) {
      console.log(err)
      throw Error
    }
  })
}
