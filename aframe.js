let metalness=[];
let roughness=[];
let color = []

/*********************************************************
 * @name: carman component
 * @desc: This component will traverse the car component and create a new model. So that we can change as we want.
 *********************************************************/
AFRAME.registerComponent('carman', {
    init: function(){
        let el = this.el;
        let self = this;
        self.cars = [];  
        // Traverse the car model and create a new one.
        el.addEventListener("model-loaded", e =>{
            let car3D = el.getObject3D('mesh');
            if (!car3D){return;}
            car3D.traverse(function(node){
                if (node.isMesh){
                  self.cars.push(node);
                }
                if(node.material){
                  color.push(node.material.color);
                  metalness.push(node.material.metalness);
                  roughness.push(node.material.roughness);
                }
              });

            // for(let c of self.cars){
            //   console.log(c.name)
            // }
      });


      el.addEventListener('changecolor', e =>{
        let colorp = e.detail;
        let colorHex = Number(colorp.replace('#', '0x'));
        let color3D = new THREE.Color(colorHex);
        for (var i = 0; i < self.cars.length; i++) {
          if (!self.cars[i].material)return
          if (self.cars[i].name.includes("Mesh.089_4")) {
            self.cars[i].material.metalness = 0.7
            self.cars[i].material.roughness = 0.2
            self.cars[i].material.color = color3D;
          }
        }



        el.addEventListener('removecolor', e=>{
          for (var i = 0; i < self.cars.length; i++){
            if (!self.cars[i].material)return
            if (self.cars[i].name.includes("Mesh.089_4")) {
              self.cars[i].material.color = color[i];
              self.cars[i].material.metalness = metalness[i];
              self.cars[i].material.roughness = roughness[i];
            }
          }
        })
      });
    }
  
});