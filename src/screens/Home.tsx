import { SafeAreaView, StyleSheet, Text, View ,FlatList,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import movie from '../interfaces/Movie'

const Home = () => {
    const [movies,setMovies] = useState<movie[]>([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        try {
            setLoading(true)
            const fetchData = async () => {
                const res = await fetch("https://6abb53fdb2118ed7abb83dcf.mockapi.io/movies")
                const data = await res.json()
                setMovies(data);
            }
            fetchData();
        } catch {
            setLoading(true);
        }finally {
            setLoading(false);
        }
    },[])

  return (
    <SafeAreaView>
        <Text>Movie App</Text>
        <View>
            {!loading?<FlatList data={movies} renderItem={({item})=>{
                return <MovieCard movie={item} onSelect={()=>alert(item.title)}/>
            }} keyExtractor={(item) => item.id}/>:<ActivityIndicator size={'large'}/>}
            
        </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})