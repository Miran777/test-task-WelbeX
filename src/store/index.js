import { createStore } from "vuex";
import { blogModule } from "@/store/Modul";


export default createStore({

    modules: {
        blog: blogModule,
    }
})