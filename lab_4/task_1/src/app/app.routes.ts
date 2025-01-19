import { Routes } from "@angular/router";
import { IndexRouteComponent } from "./routes/index-route/index-route.component";
import { ProductRouteComponent } from "./routes/product-route/product-route.component";
import { LoginRouteComponent } from "./routes/login-route/login-route.component";
import { RegisterRouteComponent } from "./routes/register-route/register-route.component";
import { NotfoundRouteComponent } from "./routes/notfound-route/notfound-route.component";
import { CartRouteComponent } from "./routes/cart-route/cart-route.component";

export const routes: Routes = [{
    path: "",
    component: IndexRouteComponent,
    title: "ShopEG - Home",
}, {
    path: "product/:id",
    component: ProductRouteComponent,
    title: (route) => {
        return `ShopEG - ${route.params["id"]}`;
    },
}, {
    path: "login",
    component: LoginRouteComponent,
    title: "ShopEG - Login",
}, {
    path: "register",
    component: RegisterRouteComponent,
    title: "ShopEG - Register",
}, {
    path: "cart",
    component: CartRouteComponent,
    title: "ShopEG - Cart",
}, {
    path: "**",
    component: NotfoundRouteComponent,
    title: "ShopEG - 404",
}];
