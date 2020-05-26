export const discount: Models.Discount = {
    id: 'id',
    created_at: new Date(),
    updated_at: new Date(),
    name: 'test discount',
    value: 10,
    flat: true,
    vertical_details: {},
    has_included_products: true,
    upper_limit: 0,
    min_price: 0,
    user_context: 'buying',
    has_customer_group: false,
}

export const productRule: Models.ProductRule = {
    name: 'TEST RULE',
    id: 1,
    description: 'Test Description',
    query: '*',
}