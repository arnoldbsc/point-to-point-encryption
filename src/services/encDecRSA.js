import rsa from 'js-crypto-rsa'

let localPrivateKey
let localPublicKey

const generateKeys = async() => {
    const {publicKey, privateKey} = await rsa.generateKey(2048)
    localPrivateKey = privateKey
    localPublicKey = publicKey
}

const getPublicKey = async() => {
    if(localPrivateKey === undefined){
        await generateKeys()
    }
    return localPublicKey.n
}

const formatKey = (key) => {
    return {e: 'AQAB', kty: 'RSA', n: key}
}

const uintArrToString = (uintArr) => {
    const arrayBuffer = Array.from(uintArr)
    return arrayBuffer.map(b => b.toString(16).padStart(2, '0')).join('')
}

const encrypt = async(message, key) => {
    try{
        const buffer = new TextEncoder().encode(message)
        const encrypted = await rsa.encrypt(buffer, formatKey(key), 'SHA-256')
        return uintArrToString(encrypted)
    } catch(error) {
        return 'No se pudo encriptar: la llave no tiene el formato correcto'
    }
} 

const decrypt = async(message, key) => {
    const buffer = new Uint8Array(message.match(/[\da-f]{2}/gi).map((h) => { return parseInt(h, 16) }))
    /* const signature = await rsa.sign(buffer, localPrivateKey, 'SHA-256', {name: 'RSA-PSS', saltLength: 64})
    const valid = await rsa.verify(buffer, signature, localPublicKey, 'SHA-256', {name: 'RSA-PSS', saltLength: 64}) */
    try {
        const decryptData = await rsa.decrypt(buffer, localPrivateKey, 'SHA-256')
        return new TextDecoder().decode(decryptData)
    } catch (error) {
        return 'No se pudo desencriptar: el mensaje a desencriptar no tiene el formato correcto'
    }
}

const toExport = {encrypt, decrypt, getPublicKey}

export default toExport