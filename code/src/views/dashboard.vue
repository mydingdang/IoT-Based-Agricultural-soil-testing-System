<style>
    /*CSS代码：*/  
/*左对齐*/  
.left {  
        text-align: left;  
        border: 1px dotted black;  
        width: 50%;  
}  
/*右对齐*/  
.right {  
        text-align: right;  
        border: 1px dotted black;  
        width: 50%;  
}  
/*居中对齐*/  
.center {  
        text-align: center;  
        border: 1px dotted black;  
        width: 50%;  
}  
/*两端对齐*/  
.justify {  
        text-align: justify;  
        border: 1px dotted black;  
        width: 50%;  
}  

</style>


<script>
import Axios from 'axios'

// 给每个 todo 对象一个唯一的 id
let id = 0
export default {
  data() {
    return {
        info : 0,
        success: 0
      
    }
  },
  methods: {
    async addSensor() {
        if(this.newSensor==''){
            window.alert("The sensor name cannot be empty!")
        }
        else if(this.newType==''){
            window.alert("You must select a type the new sensor belows to!")
        }
        else{
            await Axios.post('http://localhost:8080/api', {name:this.newSensor, type:this.newType,status:'', data:''})
            .then(res=>{console.log(res)}).catch(err=>{});
            this.getdata();
            this.success++;
            
        }
    },
    async removeSensor(n, t) {
        await Axios.delete('http://localhost:8080/api/', {data:{name:n, type: t}})
        .then(res=>{console.log(res)}).catch(err=>{});
            this.success++;
        this.getdata();
    },
    async getdata(){
            await Axios.get('http://localhost:8080/api').then(res=>{this.info=res.data}).catch(err=>{});
    },

  }
}
</script>


<template>
    <main class="flex flex-col items-center justify-center">
        <header class="relative my-6">
            <img src="../assets/icon-browser-256.png" style="width: 90px">
        
        </header>
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <br>
        <div style="text-align:center">
            <form class="font-bold" @submit.prevent="addSensor">
                <input type="text" style="color:black" v-model="newSensor"> <br>
                <input type="radio" name="type" value="temperature" v-model="newType">temperature 
                <input type="radio" name="type" value="humidity" v-model="newType">humidity 
                <input type="radio" name="type" value="moisture" v-model="newType">moisture
                <input type="radio" name="type" value="light" v-model="newType">light 
                <br><button class="text-yellow-500 font-bold">&nbsp;&nbsp;Add Sensor</button>    
            </form>
            <br>
        </div>   
            <div style="text-align: center">
                <table border="1" cellpadding="3" cellspacing="0" style="width: 60%;margin:auto">                  
                    <tr>
                        <th class="font-bold">DELETE</th>
                        <th class="font-bold">NAME</th>
                        <th class="font-bold">TYPE</th>
                        <th class="font-bold">STATUS</th>
                        <th class="font-bold">DATA</th>   
                    </tr>
                    <tr v-for="sensor in info">
                        <td><button class="text-yellow-500 font-bold" @click="removeSensor(sensor.name, sensor.type)">
                            X
                    </button></td>
                        <td class="font-bold">{{ sensor.name }} </td>
                        <td class="font-bold">{{ sensor.type }} </td>
                        <td class="font-bold text-green-300" v-if=" sensor.status === 'alive'" >{{ sensor.status }} </td>
                        <td class="font-bold" v-if=" sensor.status === 'alive'">{{ sensor.data }} </td>
                        <td class="font-bold text-red-400" v-if=" sensor.status === 'dead'" >{{ sensor.status }} </td>
                        <td class="font-bold text-red-500" v-if=" sensor.status === ''" >not available </td>
                        <td class="font-bold text-white-500" v-if=" sensor.type === 'temperature' && sensor.status === 'alive'" >°C </td>
                        <td class="font-bold text-white-500" v-if=" sensor.type === 'humidity' && sensor.status === 'alive'" >%rh </td>
                        <td class="font-bold text-white-500" v-if=" sensor.type === 'moisture' && sensor.status === 'alive'" >pF </td>
                        <td class="font-bold text-white-500" v-if=" sensor.type === 'light' && sensor.status === 'alive'" >lx </td>
                    </tr>

                </table>
            </div>
        <footer>
            <br>
            <!-- <a>{{success}}</a> -->
            <br>
            <button @click="getdata" class = "text-green-400 font-bold ">
                QUERY/REFRESH
            </button>

        </footer>
    </main>
</template>