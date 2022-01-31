/*********************************************************
 * @name: init
 * @desc: fired on initialization
 *********************************************************/
let id=undefined;




/*********************************************************
 * @name: AddColor
 * @desc: fired when user change the input
 *********************************************************/
const addColor = (e)=>{
  const isInput = e.target.getAttribute('type');
  if(isInput){
    const isSelected = e.target.checked;
    if(!id){
      id=e.target.id;
    } 
    if(id!==e.target.id){
      document.querySelector(`#${id}`).checked=false;
      id=e.target.id;
    }
    if(!isSelected){
      removecolor();
      return;
    }
    const selectedColor = e.target.getAttribute('name');
    console.log('Color selected is =>', selectedColor, isSelected, isInput);
    emitchange(selectedColor);
  }
}

// A function which will emit an event 'changecolor' with a argument of "color code".
/*********************************************************
 * @name: ChangeColor
 * @desc: It will emit an event 'changecolor'
 *********************************************************/
function emitchange(color){
  let car = document.querySelector("#car");
  car.emit('changecolor',color);
}



/*********************************************************
 * @name: RemoveColor
 * @desc: It will emit an event 'removecolor'
 *********************************************************/
function removecolor(){
  let car = document.querySelector("#car");
  car.emit("removecolor");
}




/*********************************************************
 * @name: init
 * @desc: fired on initialization
 *********************************************************/
(() => {
  const colorsUL = document.querySelector('#colors-list');
  colorsUL.addEventListener('click', addColor);
})();