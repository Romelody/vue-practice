var eventBus = new Vue()
Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:`
    <div class="product">
            <div class="productImage">
                <img v-bind:src="image"><!--Como si fuera "pegamenro" se puede usar con otros como ALT HREF TITLE CLASS STYLE DISABLED-->
            </div>
            
            <div class="productInfo">
                <h1>{{title}}</h1> <!--La doble llave se llama expresion, puedo usarla para agregar caracteres crear funciones etc-->
                <p v-if="inventory > 10">In Stock</p><!--condicionales-->
                <p v-else-if = "inventory<=10 && inventory >0"> Almost out of stock!!!</p>
                <p v-else>Out of stock</p>
                <p>Shipping: {{Shipping}}</p>
                <p v-show="colorA">Pastel</p>
                <a v-bind:href="href"><p>{{descripcion}}</p></a>
                <ul>
                    <li v-for= "detail in details">{{detail}}</li>
                </ul>
                <div v-for="(variant, index) in variants"
                     :key ="variant.variantId"
                     class="color-box"
                     :style ="{backgroundColor: variant.variantColor, fontSize: variant.variantFontSize}"
                     @mouseover="updateProduct(index)">
                </div>

                <button v-on:click="addToCart"
                            :disabled="!inStock"
                            :class="{disabledButton: !inStock}">
                    Add to Cart
                </button>
            </div>

            <product-tabs :reviews="reviews"></product-tabs>

          

        </div>
    `,
    data (){
        return {
            brand: 'Vue Mastery',
            product:'Cuadro',
            selectedVariant: 0,
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
                    variantQuantity:10
                },
                {
                    variantId:2235,
                    variantColor: "black",
                    variantImage:'./assets/ACNH2.jpg',
                    variantFontSize: '50px',
                    variantQuantity:0
                }
            ],
            reviews:[]
        }
    },
    
    methods:{
        addToCart(){
            this.$emit ('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct (index){
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        Shipping(){
            if (this.premium){
                return "free"
            }
            return "$30"
        }
    },
    mounted(){
        eventBus.$on ('review-submitted', productReview =>{
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review',{
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" required>
    </p>
    <p>
        <label for="rewiew">Review:</label>
        <textarea id="review" v-model="review" required></textarea>
    </p>
    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.numeber="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>
    <p>
        <input type="submit" value="submit">
    </p>
</form>
    `,
    data(){
        return{
            name:null,
            review:null,
            rating:null
        }
    },
    methods:{
        onSubmit(){
            let productReview={
                name:this.name,
                review:this.review,
                rating:this.rating
            }
            eventBus.$emit('review-submitted', productReview)
            this.name=null,
            this.review=null,
            this.rating=null
        }
    }
})

Vue.component('product-tabs',{
    props:{
        reviews:{
            type: Array,
            required:true
        }
    },
    template:`
        <div>
            <span class="tab"
                :class="{activeTab: selectedTab === tab}"
                v-for="(tab, index) in tabs" 
                :key="index"
                @click="selectedTab = tab">
                {{tab}}
            </span>
        <div v-show="selectedTab ==='Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="review in reviews">
                    <p>Name: {{review.name}}</p>
                    <p>Comment: {{review.review}}</p>
                    <p>Rating: {{review.rating}}</p>
                </li>
            </ul>
        </div>

        <product-review  v-show="selectedTab ==='Make a Review'"></product-review>
        </div>
        
        `,
    data(){
        return{
            tabs:['Reviews','Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

var app = new Vue ({ //Llamamos los componentes de Vue para que funcione es el Corazon de Vue
    el: '#app', //El conecta el Vue value con objetos del DOM
    data:{
        premium:true,
        cart:[]
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        }
    }
})