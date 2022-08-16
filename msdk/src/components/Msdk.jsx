import React, {useRef} from 'react';
import '../App.css';




ZoomMtg.setZoomJSLib('https://source.zoom.us/2.6.0/lib', '/av')


ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function Msdk() {
    // const [isBtn, setIsBtn] = useState(true)

   
    var signatureEndpoint = 'YOUR ENDPOINT'
    var sdkKey = 'YOUR SDK KEY'
    var meetingNumber = 'MEETING NUMBER'
    var role = 0
    var leaveUrl = 'http://localhost:8082'
    var userName = 'DA tst'
    var userEmail = 'donte.zoomie@gmail.com'
    var passWord = 'Your PASSWORD'
   
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
  
          <button onClick={getSignature}>Join Meeting</button>
         
          </>
    
    );
  }
  
  export default Msdk;