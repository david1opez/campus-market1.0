export type Product = {
    title: string;
    description: string;
    price: number;
    image: string;
}

export type ProductsProps = {
    product: Product;
    index: number;
    onSelect: (id: number) => void;
}