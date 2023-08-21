const myNum = document.querySelectorAll('.count')
// console.log(myNum,innerText)
let speed=100;
myNum.forEach((element,i)=>{     //mycount=element
    

    let target_count=element.dataset.count;
    let init_count=+element.innerText;
    // console.log(target_count)
    let newspeed= Math.floor(target_count/speed);

    const updateNumber=()=>{
        init_count+=newspeed;
        element.innerText=init_count;
        if(init_count<target_count){
            setTimeout(()=>{updateNumber()},timeout=7)
        }
    }
    updateNumber();
})