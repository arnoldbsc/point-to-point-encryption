import Content from './components/content'
import Card from './components/card'
import Input from './components/input'
import { Formik, Form } from 'formik'
import Button from './components/button'
import * as Yup from 'yup'
import { useEffect, useRef } from 'react'
import RSA from './services/encDecRSA'
import colors from './colors'
import {ReactComponent as CopyIcon} from './icons/copyIcon.svg'
import {ReactComponent as PasteIcon} from './icons/pasteIcon.svg'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '.8rem',
  height: '100%',
  width: '100%',
  margin: '0',
}

const validate = Yup.object({
  data: Yup.string().test(
    'len',
    'No se puede ingresar mas 190 de caracteres',
    value => {
      if(cript){
        if(value !== undefined){
          return value.length <= 190
        }
      }
      return true
    }
  ).test({
    name: 'required',
    params: { },
    message: 'Es necesario llenar el texto a encriptar',
    test: function(value) {
      if(cript){
        return value !== undefined
      }
      return true
    },
  }),
  encryptData: Yup.string().test({
    name: 'required',
    params: {},
    message: 'Es necesario llenar el texto a desencriptar',
    test: function(value) {
      if(!cript){
        return value !== undefined
      }
      return true
    }
  }).test(
    'len',
    'El mensaje encriptado tiene que tener 512 caracteres',
    value => {
      if(!cript){
        if(value !== undefined){
          return value.length === 512
        }
      }
      return true
    }
  ),
  publicKeyCrypt: Yup.string().test({
    name: 'required',
    params: {},
    message: 'Es necesario ingresar la llave para desencriptar',
    test: function(value) {
      if(cript){
        return value !== undefined
      }
      return true
    }
  }).test(
    'len',
    'La clave de encriptacion tiene que tener 342 caracteres',
    value => {
      if(cript){
        if(value !== undefined){
          return value.length === 342
        }
      }
      return true
    }
  ),
});

let cript = true

const App = () => {
  const formikRef = useRef()
  
  const handleClick = (state, formik) => {
    cript = state
    formik.submitForm()
  }

  const handleSubmit = async(values, formik) => {
    if(cript){
      const rsaEncryptData = await RSA.encrypt(values.data, values.publicKeyCrypt)
      formik.setFieldValue('encryptData', rsaEncryptData)
    } else {
      const rsaDecryptData = await RSA.decrypt(values.encryptData)
      formik.setFieldValue('data', rsaDecryptData)
    }
  }

  const initialize = async() => {
    const localPublicKey = await RSA.getPublicKey()
    formikRef.current.setFieldValue('publicKeyDecrypt', localPublicKey)
  }

  useEffect(()=>{
    initialize()
  }, [])


  return (
    <Content>
        <Formik
        initialValues={{
          data: '',
          encryptData: '',
          publicKeyCrypt: '',
          publicKeyDecrypt: ''
        }}
        validationSchema={validate}
        validateOnChange={false}
        validateOnBlur={false}
        innerRef={formikRef}
        onSubmit={(values, formik) => handleSubmit(values, formik)}
        >
          {(formik) => (
            <Form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',width: '100%',height: '100%', margin: '0'}}>
              <Card vertical>
                <div style={style}>
                  <Input title='Clave publica para encriptar' autoComplete='off' name='publicKeyCrypt'><PasteIcon onClick={async()=>formik.setFieldValue('publicKeyCrypt', await navigator.clipboard.readText())} fill={colors.accent} width='2rem' height='2rem' style={{position: 'absolute', left: 'calc(100% - 2.5rem)', top: '.5rem'}}/></Input>
                  <Input title='Mensaje' textarea name='data'/>
                  <div style={{display: 'flex', width: '100%', gap: '1rem'}}>
                    <Button onClick={() => navigator.clipboard.writeText(formik.values.data)}>Copiar</Button>
                    <Button onClick={() => formik.setFieldValue('data', '')}>Borrar</Button>
                  </div>
                  <Button primary onClick={() => handleClick(true, formik)}>Encriptar</Button>
                </div>
                <div style={style}>
                  <Input title='Clave publica local' disabled='disabled' name='publicKeyDecrypt'><CopyIcon onClick={() => navigator.clipboard.writeText(formik.values.publicKeyDecrypt)} fill={colors.accent} width='2rem' height='2rem' style={{position: 'absolute', left: 'calc(100% - 2.5rem)', top: '.5rem'}}/></Input>
                  <Input title='Mensaje encriptado' textarea name='encryptData'/>
                  <div style={{display: 'flex', width: '100%', gap: '1rem'}}>
                    <Button onClick={() => navigator.clipboard.writeText(formik.values.encryptData)}>Copiar</Button>
                    <Button onClick={() => formik.setFieldValue('encryptData', '')}>Borrar</Button>
                  </div>
                  <Button primary onClick={() => handleClick(false, formik)}>Desencriptar</Button>
                </div>
              </Card>
            </Form>
          )}
        </Formik>
    </Content>
  );
}

export default App;