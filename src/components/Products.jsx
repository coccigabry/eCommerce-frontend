import { useState, useEffect } from "react"
import axios from "axios"
import SingleProduct from "./SingleProduct"
import styled from 'styled-components'


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({ category, filters, sort, pop }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    category ? `http://localhost:4000/api/product?category=${category}` : 'http://localhost:4000/api/product'
                )
                setProducts(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [category])

    useEffect(() => {
        category &&
            setFilteredProducts(
                products.filter(item =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )   
                )
            )
    }, [category, filters, products])

    useEffect(() => {
        if (sort == 'new') { 
            setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
        } else if (sort == 'asc') { 
            setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
        } else {
            setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
        }
    }, [sort])

    const renderFilteredProducts = filteredProducts.map(item => {
        const id = item._id
        return (
            <SingleProduct key={id} {...item} />
        )
    })

    const renderPopProducts = products.slice(0, 5).map(item => {
        const id = item._id
        return (
            <SingleProduct key={id} {...item} />
        )
    })

    if (products.length == 0) {
        return (
            <Container>
                <h3 style={{ margin: '70px auto' }}>No items found</h3>
            </Container>
        )
    }

    return (
        <Container>
            {
                category ? renderFilteredProducts : renderPopProducts
            }
        </Container>
    )
}

export default Products