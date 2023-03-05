import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'
function initStripe(){
    const paymentType=document.querySelector('#paymentType')

//Ajax call
const paymentForm = document.querySelector('#payment-form')
if(paymentForm){
    paymentForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        let formData = new FormData(paymentForm)
        let formObject = {}
        for(let [key,value] of formData.entries()){
            formObject[key]=value
        }
        axios.post('/orders',formObject).then( (res) => {
            new Noty({
                type: 'success',
                timeout: 1000,
                progressBar:false,
                text:res.data.message
            }).show();
            setTimeout( ()=> {

                window.location.href = '/customer/orders'
            },1000)
            // console.log(res.data)
        }).catch((err)=>{
            new Noty({
                type: 'success',
                timeout: 1000,
                progressBar:false,
                text:err.res.data.message
            }).show();
            // console.log(err)
        })
    })
    
}

}
module.exports = initStripe