var app = new Vue ({ //Llamamos los componentes de Vue para que funcione es el Corazon de Vue
    el: '#app', //El conecta el Vue value con objetos del DOM
    data: {
        product:'Cuadro',
        image:'./assets/ACNH1.jpg',
        descripcion:'Owner',
        href:'https://www.pinterest.es/pin/633952085036689444/',
        inventory:'5',
        colorA: true,
        details: ["80% cotton", "20%polyester", "gender-neutral"],
        variants:[
            {
                variantId:2234,
                variantColor: "pink",
                variantImage:'./assets/ACNH1.jpg',
                variantFontSize: '13px',
            },
            {
                variantId:2235,
                variantColor: "black",
                variantImage:'./assets/ACNH2.jpg',
                variantFontSize: '50px',
            }
        ],
        cart:0
    },
    
    methods:{
        addToCart: function (){
            this.cart += 1
        },
        updateProduct: function (variantImage){
            this.image = variantImage
        }
    }
})