import React, {useRef, useState} from 'react';
import '../App.css';

import styles from "./RegistrationForm.module.css";

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.6.0/lib', '/av')


ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function Msdk() {
  const [state, setState] = useState({ meetingNumber: '', passWord: '', userName: '',role: 1 });
    const { meetingNumber, passWord, role, userName } = state;
    // const [isBtn, setIsBtn] = useState(true)

    var signatureEndpoint = ''
    var sdkKey = ''
    var leaveUrl = 'http://localhost:8082'
    var userEmail = ''
    var registrantToken = ''
    
    const leavebtn = document.querySelector('zmu-btn footer__leave-btn ax-outline ellipsis zmu-btn--danger zmu-btn__outline--blue')
    console.log('Leave Button: ',leavebtn)

    // const handleClick = (e) => {
        
    // if(e.target.textContent === "Leave"){
    //       ZoomMtg.leaveMeeting({});
    // }else {
    //      console.log(e.target.textContent)
    //       console.log('A key was pressed', e.currentTarget);
    //     }
       
    //   };
    
    //   React.useEffect(() => {
    //     window.addEventListener('click', handleClick );
    
    //     // cleanup this component
    //     return () => {
    //       window.removeEventListener('click', handleClick );
    //     };
    //   }, []);

    
      // window.addEventListener('unload', () => {
      //   ZoomMtg.leaveMeeting({});
      // });

  
    function getSignature(e) {
      e.preventDefault();


  
  
      fetch(signatureEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role
        })
      }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature)
  
        console.log("What is this : ",startMeeting)
      }).catch(error => {
        console.error(error)
      })
    }
  
    function startMeeting(signature) {
      document.getElementById('zmmtg-root').style.display = 'block'

    

      ZoomMtg.init({
        leaveUrl: leaveUrl,
        success: (success) => {
          console.log(success)
  
          ZoomMtg.join({
            signature: signature,
            meetingNumber: meetingNumber,
            userName: userName,
            sdkKey: sdkKey,
            userEmail: userEmail,
            passWord: passWord,
            tk: registrantToken,
            success: function(res) {
              console.log("join meeting success");
              console.log("get attendeelist");
              ZoomMtg.getAttendeeslist({
                success: function(res) {
                    console.log("success getAttendeeslist", res.log);
                }})
              ZoomMtg.getCurrentUser({
                  success: function(res) {
                      console.log("success getCurrentUser", res.result.currentUser);
                  },
              });
              if(leavebtn){
                ZoomMtg.leaveMeeting({
                      success: function(res) {
                          console.log("Leave Meeting successful!");
                      },
                      error: function(res) {
                          console.log("Leave Meeting failed with error:", res);
                      }
                  });}
          },
            error: (error) => {
              console.log(error)
            }
          })
  
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  
    return (
      <>
      <div className={styles.justifyContentAround}>

  <form className={styles.formStyle} onSubmit={getSignature}>
       
    
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            className={styles.formControl}
            value={userName}
            onChange={e => setState({ meetingNumber, passWord,userName: e.target.value, role })}
            name="email"
          />
        </div>
      
        <div className={styles.formGroup}>
          <label htmlFor="Meeting ID">MeetingID</label>
          <input
            className={styles.formControl}
            value={meetingNumber}
            onChange={e => setState({ meetingNumber: e.target.value.replaceAll(/\s/g,''), passWord, userName, role })}
            placeholder="Meeting ID"
            name="MeetingID"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="passWord">PassWord</label>
          <input
            className={styles.formControl}
            value={passWord}
            onChange={e => setState({ meetingNumber, passWord: e.target.value,userName, role })}
            placeholder="Meeting Passcode (optional)"
          />
        </div>
    
        <div>
          <button onClick={getSignature}>Join Meeting</button> 
        </div>
      </form>
      </div>
          </>
    
    );
  }
  
  export default Msdk;