import Head from 'next/head'
import Header from '../components/Header/Header'
import SocialMedia from '../components/SocialMedia'
import InputSimple from '../components/Inputs/Input'
import Loader from 'react-loader-spinner'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from '@emotion/styled'

import { useState, useEffect } from 'react'

export default function Contact({ links, linksSocial, contact, loader }) {
  const [activeMenu, setActiveMenu] = useState(1)
  const [videoActive, setVideoActive] = useState(1)
  const [secondVideo, setSecondVideo] = useState(false)
  const [finalVideo, setFinalVideo] = useState(false)
  const [load, setLoad] = useState(false)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [emailValidate, setEmailValidate] = useState(undefined)
  const [message, setMessage] = useState('')
  const [errVerify, setErrVerify] = useState(false)
  const [errName, setErrName] = useState('')
  const [sendProcess, setSendProcess] = useState(1)

  useEffect(() => {
    if (secondVideo && finalVideo && !loader) {
      setTimeout(() => {
        setLoad(true)
      }, 500)
    } else if (loader) {
      setLoad(false)
    }
  })

  const handleClick = () => {
    if (name === '') {
      err('name')
      return
    }
    if (lastName === '') {
      err('lastname')
      return
    }
    if (email === '' || !emailValidate) {
      err('email')
      return
    }
    if (message === '') {
      err('message')
      return
    }

    if (
      message !== '' &&
      email !== '' &&
      emailValidate &&
      lastName !== '' &&
      name !== ''
    ) {
      setErrVerify(false)
      setSendProcess(2)
      sendEmail()
    }
  }

  const confirmSend = () => {
    setVideoActive(3)
    setSendProcess(3)
    const video = document.getElementById('videoFinal')
    video.play()
  }

  const errorSend = () => {
    setSendProcess(4)
  }

  const err = (name) => {
    const option = document.getElementById(name)
    option.parentNode.style.boxShadow = '0px 0px 3px 1px red'

    setErrName(option.placeholder)
    setErrVerify(true)
  }

  const handleInput = (props) => {
    if (props) {
      setVideoActive(2)
    } else {
      setVideoActive(1)
    }
  }

  const confirmEmail = (props) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmail(props)
    if (props === '') {
      setEmailValidate(undefined)
    } else if (props !== '' && !re.test(props)) {
      setEmailValidate(false)
    } else if (props !== '' && re.test(props)) {
      setEmailValidate(true)
    }
  }

  const sendEmail = async () => {
    const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title></title>
        <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
        <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    </head>
    
    <body>
        <div class="es-wrapper-color">
            <!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#eeeeee"></v:fill>
          </v:background>
        <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td class="esd-email-paddings" valign="top">
                            <table class="es-content esd-header-popover" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr></tr>
                                    <tr>
                                        <td class="esd-stripe" esd-custom-block-id="7799" align="center">
                                            <table class="es-header-body" style="background-color: #044767;" width="600" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p35t es-p40b es-p35r es-p35l" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-m-txt-c" align="center">
                                                                                            <h1 style="color: #ffffff; line-height: 100%;">XIBUX</h1>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p35t es-p25b es-p35r es-p35l" esd-custom-block-id="7811" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p20t es-p5b" align="left">
                                                                                            <h3 style="color: #333333;">Hola ${
                                                                                              name +
                                                                                              ' ' +
                                                                                              lastName
                                                                                            } se quiere comunicar contigo,</h3>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="esd-block-text es-p5t es-p10b" align="left">
                                                                                            <p style="font-size: 16px; color: #777777;">${message}</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td align="left" class="esd-block-text">
                                                                                            <p>Correo: ${email}</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" align="center">
                                            <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure es-p15t es-p35r es-p35l" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="530" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-image" align="center" style="font-size:0"><a target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_75694a6fc3c4633b3ee8e3c750851c02/images/18501522065897895.png" alt style="display: block;" width="46"></a></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" class="es-content esd-footer-popover" align="center">
                                <tbody>
                                    <tr>
                                        <td class="esd-stripe" esd-custom-block-id="7766" align="center">
                                            <table class="es-content-body" style="border-bottom:10px solid #48afb5;background-color: #1b9ba3;" width="600" cellspacing="0" cellpadding="0" bgcolor="#1b9ba3" align="center">
                                                <tbody>
                                                    <tr>
                                                        <td class="esd-structure" align="left">
                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="esd-container-frame" width="600" valign="top" align="center">
                                                                            <table width="100%" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td class="esd-block-menu">
                                                                                            <table class="es-menu" width="40%" cellspacing="0" cellpadding="0" align="center">
                                                                                                <tbody>
                                                                                                    <tr class="links-images-top">
                                                                                                        <td class="es-p10t es-p10b es-p5r es-p5l " style="padding-bottom: 30px; padding-top: 35px; " width="50%" bgcolor="transparent" align="center"><a target="_blank" style="color: #ffffff; font-size: 20px;" href><img src="https://tlr.stripocdn.email/content/guids/CABINET_3ef3c4a0538c293f4c84f503cd8af2cc/images/60961522067175378.png" alt title class="es-p5b" height="27" align="absmiddle"><br></a></td>
                                                                                                        <td class="es-p10t es-p10b es-p5r es-p5l " style="padding-bottom: 30px; padding-top: 35px; " width="50%" bgcolor="transparent" align="center"><a target="_blank" style="color: #ffffff; font-size: 20px;" href><img src="https://tlr.stripocdn.email/content/guids/CABINET_3ef3c4a0538c293f4c84f503cd8af2cc/images/72681522067183042.png" alt title class="es-p5b" height="27" align="absmiddle"><br></a></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    
    </html>
    `

    const raw = JSON.stringify({
      to: 'contact@xibux.com',
      from: 'contact@xibux.com',
      replyTo: 'no-reply@gmail.com',
      subject: 'Xibux Web Contact',
      html: html,
    })

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    }

    await fetch('https://xibuxcms.herokuapp.com/email', requestOptions)
      .then((response) => response.text())
      .then(() => confirmSend())
      .catch((error) => errorSend(error))
  }

  return (
    <>
      <Head>
        <title>Xibux Studio - Contact</title>
      </Head>
      <Header
        links={links}
        first={4}
        onHandleClick={() => setActiveMenu(activeMenu === 1 ? 0 : 1)}
        active={activeMenu}
        load={load}
      />
      <SocialMedia linksSocial={linksSocial} />
      <StyledBackVideo load={load}>
        <video
          onCanPlayThrough={() => setFinalVideo(true)}
          id="videoFinal"
          className={
            videoActive === 3
              ? 'videoactive showvideo'
              : 'videoactive hidevideo'
          }
          src={contact[0].video3[0].url}
          muted
        />
        <video
          onCanPlayThrough={() => setSecondVideo(true)}
          className={
            videoActive === 2
              ? 'videoactive showvideo'
              : 'videoactive hidevideo'
          }
          src={contact[0].video2[0].url}
          autoPlay
          loop
          muted
        />
        <video
          onCanPlayThrough={() => setFinalVideo(true)}
          className={
            videoActive === 1
              ? 'videoactive showvideo'
              : 'videoactive hidevideo'
          }
          src={contact[0].video1[0].url}
          autoPlay
          loop
          muted
        />
      </StyledBackVideo>
      <StyledForm id="form" load={load}>
        <div className="cont">
          <div className="head-form">
            <div className="logo">
              <img src="./images/xibux-logo.png" alt="logo xibux" />
            </div>
          </div>
          {errVerify && (
            <div className="messageError">
              <div className="iconBox">
                <FontAwesomeIcon
                  className="icon"
                  icon={['fas', 'times-circle']}
                />
              </div>
              <div className="textBox">
                <h1>ERROR!</h1>
                <p>Please enter {errName} valid</p>
              </div>
            </div>
          )}
          {sendProcess === 1 ? (
            <></>
          ) : sendProcess === 2 ? (
            <div className="loader">
              <Loader type="TailSpin" color="#3b3b3b" height={40} width={40} />
            </div>
          ) : sendProcess === 3 ? (
            <div className="messageSend">
              <div className="iconBox">
                <FontAwesomeIcon
                  className="icon"
                  icon={['fas', 'check-circle']}
                />
              </div>
              <div className="textBox">
                <h1>SUCCESS!</h1>
                <p>Thank you for writing to us very soon we will contact you</p>
              </div>
            </div>
          ) : (
            <div className="messageError">
              <div className="iconBox">
                <FontAwesomeIcon
                  className="icon"
                  icon={['fas', 'times-circle']}
                />
              </div>
              <div className="textBox">
                <h1>ERROR!</h1>
                <p>A problem has occurred, please try again later</p>
              </div>
            </div>
          )}
          <div className="content-form">
            <InputSimple
              id="name"
              type="text"
              placeholder="Name"
              icon="user"
              color={name !== '' ? '#18CC9C' : '#3b69ff'}
              onChange={(props) => setName(props)}
              onInput={(props) => handleInput(props)}
            />
            <InputSimple
              id="lastname"
              type="text"
              placeholder="Last Name"
              icon="user"
              color={lastName !== '' ? '#18CC9C' : '#3b69ff'}
              onChange={(props) => setLastName(props)}
              onInput={(props) => handleInput(props)}
            />
            <InputSimple
              id="email"
              type="text"
              placeholder="email"
              icon="envelope"
              color={
                emailValidate === undefined
                  ? '#3b69ff'
                  : emailValidate
                  ? '#18CC9C'
                  : 'orange'
              }
              onChange={(props) => confirmEmail(props)}
              onInput={(props) => handleInput(props)}
            />
            <InputSimple
              id="message"
              type="textarea"
              placeholder="Message"
              icon="comment-alt"
              color={message !== '' ? '#18CC9C' : '#3b69ff'}
              onChange={(props) => setMessage(props)}
              onInput={(props) => handleInput(props)}
              rows="3"
            />
          </div>
          <div onClick={handleClick} className="btn">
            <a>Send</a>
          </div>
        </div>
      </StyledForm>
    </>
  )
}

const StyledForm = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .cont {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    transition: all 0.5s linear;
  }
  .head-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    width: 100%;
    .logo {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 25px;
      padding: 5px;
      border-radius: 15px;
      img {
        width: 100%;
      }
    }
  }
  .messageSend {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    padding: 10px;
    background: #3af57666;
    border-radius: 5px;
    margin-bottom: 15px;
    .iconBox {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 80%;
        height: 80%;
        color: #3b3b3b55;
      }
    }
    .textBox {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      color: #3b3b3b;
      h1 {
        font-size: 0.9rem;
      }
      p {
        font-size: 0.8rem;
      }
    }
  }
  .messageError {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    padding: 10px;
    background: #ff0e0d44;
    border-radius: 5px;
    margin-bottom: 15px;
    .iconBox {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 80%;
        height: 80%;
        color: #3b3b3b55;
      }
    }
    .textBox {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      color: #3b3b3b;
      h1 {
        font-size: 0.9rem;
      }
      p {
        font-size: 0.8rem;
      }
    }
  }
  .error {
    margin-bottom: 10px;
    color: red;
    font-size: 0.8rem;
  }
  .content-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 200px;
  }
  .btn {
    width: 50%;
    background: #3b69ff;
    color: #fff;
    text-align: center;
    padding: 10px;
    font-family: Raleway;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 25px;
    box-shadow: 0px 0px 3px 0px #00000066;
    cursor: pointer;
  }
  @media screen and (min-width: 500px) and (orientation: landscape) {
    overflow: hidden;
    .cont {
      width: 50%;
      max-width: 400px;
      top: 50%;
      height: 70%;
      min-height: 250px;
      transform: translateX(-25%)
        translateY(${(props) => (props.load ? '-40%' : '100%')});
      background: transparent;
      padding: 0 20px;
    }
    .head-form {
      display: none;
    }
    .content-form {
      min-height: 150px;
    }
    .btn {
      margin-top: 5px;
      font-size: 0.9rem;
      padding: 5px;
    }
  }
  @media screen and (min-width: 1000px) {
    right: 15%;
    .head-form {
      display: flex;
    }
  }
`

const StyledBackVideo = styled.div`
  transform: translateY();
  .videoactive {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, ${(props) => (props.load ? '-50%' : '50%')});
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
    background-size: cover;
    transition: all 0.2s linear;
    display: none;
    overflow: hidden;
  }
  .hidevideo {
    opacity: 0;
  }
  .showvideo {
    opacity: 1;
  }
  @media screen and (min-width: 500px) and (orientation: landscape) {
    .videoactive {
      display: block;
    }
  }
`

export async function getServerSideProps() {
  const { API_URL } = process.env

  const resNav = await fetch(`${API_URL}/menu-links`)
  const resSocial = await fetch(`${API_URL}/social-medias`)
  const resContact = await fetch(`${API_URL}/contactos`)

  const dataNav = await resNav.json()
  const dataSocial = await resSocial.json()
  const dataContact = await resContact.json()

  return {
    props: {
      links: dataNav,
      linksSocial: dataSocial,
      contact: dataContact,
    },
  }
}
