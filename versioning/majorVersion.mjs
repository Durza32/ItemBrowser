import * as fs from 'node:fs'

fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    throw Error
  }
  updateMajorVersion(JSON.parse(data))
})

const updateMajorVersion = (fileData) => {
  const [major, minor, patch] = fileData.version.split('.')
  let intMajor = parseInt(major)
  intMajor += 1
  const newVersion = [intMajor.toString(), minor, patch]
  fileData.version = newVersion.join('.')
  fs.writeFile('config.json', JSON.stringify(fileData, null, 2), (err) => {
    if (err) {
      console.log(err)
      throw Error
    }
  })
}
