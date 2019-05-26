const path = require('path')
const fs = require('fs')

class JSONCollection {

    constructor(name) {
        this.storagePath = path.join(__dirname, `../data/${name}.json`)
    }

    fetch() {
        const raw = fs.readFileSync(this.storagePath)
        const data = JSON.parse(raw)
        return data
    }

    add(key, value) {
        const data = this.fetch()
        data[key] = value
        fs.writeFileSync(this.storagePath, JSON.stringify(data), (err) => {
            if (err) throw err
            console.log('entry added')
        })
    }

    delete(key) {
        const data = this.fetch()
        delete data[key]
        fs.writeFileSync(this.storagePath, JSON.stringify(data), (err) => {
            if (err) throw err
            console.log('entry deleted')
        })
    }

    update(key, newValue) {
        const data = this.fetch()
        data[key] = newValue
        fs.writeFileSync(this.storagePath, JSON.stringify(data), (err) => {
            if (err) throw err
            console.log('entry updated')
        })
    }
    
    find(key) {
        const data = this.fetch()
        return data[key]
    }
}

module.exports = JSONCollection