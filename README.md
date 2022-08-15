# Backend Shop
## Product
Endpoint backend: https://o3lc79zr1i.execute-api.us-east-1.amazonaws.com/dev

### Get - Products - /product
#### Description: Get al products:
- curl --location --request GET 'https://o3lc79zr1i.execute-api.us-east-1.amazonaws.com/dev/products'


### Get - Product by ID - /product/{productId}
#### Description: Get a product by ID
- productId is required
- productId is String
- curl --location --request GET 'https://o3lc79zr1i.execute-api.us-east-1.amazonaws.com/dev/products/ABC001'

### POST - Create product - /product
#### Description: Create a product

- title: String - is required
- description: String - is requires
- price: Number - is required
- count": Number - is required

## Import

### Get - Image
#### Description: Get image from bucket
- curl --location --request GET 'https://guouzuadzd.execute-api.us-east-1.amazonaws.com/dev/import/Alexa'

## Frontend
### URL: http://epam-shopcart.s3-website-us-east-1.amazonaws.com/