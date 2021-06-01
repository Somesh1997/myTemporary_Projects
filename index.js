const axios = require('axios');
var nodemailer = require('nodemailer');

(async ()=>{
    let data=await axios("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=209501&date=03-06-2021");
   //console.log(data.data.sessions);
    let arr=data.data.sessions;
    let dose1;
    let center_id;
    let name;
    let address,pincode,vaccine,block;
    for(let i=0;i<arr.length;i++)
    {
        let obj=arr[i];
        console.log(obj.center_id,obj.available_capacity_dose1);
        let dose=obj.available_capacity_dose1;
        if(dose>0)
        {
           dose1=dose;
           center_id=obj.center_id;
           name=obj.name;
           address=obj.address;
           pincode=obj.pincode;
           vaccine=obj.vaccine;
           block=obj.block_name;
        }

    }
    if(dose1>0){
        
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'somesh6g@gmail.com',
      pass: '9454331809'
    }
  });
  var mailOptions = {
    from: 'somesh6g@gmail.com',
    to: 'somesh6g@gmail.com',
    subject: 'Covid Email Vaccination ',
    text: `''' center id is ${center_id} and dose are ${dose1} 
               Address is ${address}
               name is ${name}
               Pincode is ${pincode}
               VaccineName is ${vaccine}
               Block is ${block}
    '''`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    }
   // console.log(dose1);
})();