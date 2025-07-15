(()=>{
    "use strict";
    //Fetch all the forms we want to apply custom Boostrap validation styles to
    const forms=document.querySelectorAll(".needs-validation");

    //Loop over them prevent submision
    Array.from(forms).forEach((form)=>{
        form.addEventListener(
            "submit",
            (event)=>{
                if(!form.checkValidity()){
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            },
        false
        );
    });
})();  