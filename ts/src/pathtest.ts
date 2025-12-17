import path from 'path'
import fs from 'fs/promises'

const fileTest = async () => {
  // Read file
  const filePath = path.join(__dirname, 'test.txt')
  const x = await fs.readFile(filePath, 'utf-8')
  console.log(x)

  console.log(path.basename('resources/f1.txt'))
}

fileTest()
