import fillzero from './fillzero';
let date=(time)=>{
  var d=new Date();
  let year=d.getFullYear();
  let sec = d.getSeconds();
  return `${year}年xx月xx日 xx:xx:${fillzero(sec)}`;
};
export default date