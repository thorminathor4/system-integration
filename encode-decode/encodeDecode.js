console.log(String(new TextEncoder().encode("halløj")));
const base64val = atob("this has to be ascii");
console.log(base64val)
console.log(btoa(base64val))