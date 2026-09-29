import { StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native'
import React from 'react'
import movie from '../interfaces/Movie'
import movieCardProps from '../interfaces/MovieCard'

const MovieCard = ({movie,layout="row",onSelect}:movieCardProps) => {
    return <TouchableOpacity onPress={()=>onSelect(movie.id)} style={styles.container}>
        <View>
        <Image source={{uri:movie.poster}} style={styles.image}/>
        </View>
        <View>
        <Text>{movie.title} - {movie.genre}</Text>
        <Text>{movie.year} - {movie.rating}</Text>
        <Text>{movie.isShowing?"Đang chiếu":"Ngừng chiếu"}</Text>
        </View>
        </TouchableOpacity>
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        width:"30%",
        aspectRatio:3/4
    }
})