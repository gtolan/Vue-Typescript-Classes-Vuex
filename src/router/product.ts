export default [
  {
    path: "/products/",
    name: "Products",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {

        // when /products/categories is matched
        path: 'categories',
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/Products/ProductCategory.vue")
      },
      {

        // when /products/add-product is matched
        path: 'add-product',
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/Products/AddProduct.vue")
      },
      {

        // when /products/add-product is matched
        path: ':productName',
        params: 'productName',
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/Products/ViewProduct.vue")
      }
    ],
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue")
  }

]
