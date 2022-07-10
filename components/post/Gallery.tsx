import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, FlatList } from 'react-native';
import { vs, s } from 'react-native-size-matters';
import { MotiImage } from 'moti';

// TYPES
import { GalleryProps } from '../../types/GalleryProps';


const Gallery = ({images, returning, scrollToBeggining}: GalleryProps) => {
    const ref = useRef<FlatList>(null);

    const [scrollIndex, setScrollIndex] = useState(0);

    const scrollTo = (index: number) => {
        ref.current?.scrollToIndex({
            animated: true,
            index: index,
            viewPosition: 0.5
        })
    }

    useEffect(() => {
        if(returning) {scrollTo(0)}
    }, [returning])

    useEffect(() => {
        if(scrollIndex != 0) scrollToBeggining(true)
    }, [scrollIndex])

    return (
        <View>
            <FlatList
                ref={ref}
                style={styles.scrollImagesContainer}
                data={images}
                keyExtractor={(item, index) => (index.toString())}
                renderItem={({item, index}) => {
                    if(index == 0) {
                        return (
                            <View>
                                <Image source={{uri: item}} style={styles.image} resizeMode="cover"/>
                            </View>
                        )
                    }
                    return (
                        <Image source={{uri: item}} style={styles.image}/>
                    )
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToInterval={s(360)}
                snapToAlignment="center"
                decelerationRate={0.65}
                initialScrollIndex={scrollIndex}
                scrollEventThrottle={16}
                onScrollToIndexFailed={() => setScrollIndex(0)}
                onScroll={({nativeEvent}) => {
                    const index = Math.round(nativeEvent.contentOffset.x / s(350));
                    setScrollIndex(index);
                }}
            />
            {
                images?.length > 1 && (
                    <View style={styles.imagesPreview}>
                        {images.map((image, index) => (
                            <TouchableOpacity key={index} onPress={() => {scrollTo(index)}}>
                                <MotiImage source={{uri: image}} style={styles.imagePreview}
                                    from={{
                                        height: vs(0),
                                    }}
                                    animate={{
                                        height: s(55),
                                    }}
                                    transition={{
                                        delay: 400,
                                        duration: 400,
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )
            }
        </View>
    )
}

export default Gallery

const styles = StyleSheet.create({
    scrollImagesContainer: {
        marginBottom: vs(10)
    },
    image: {
        width: s(360),
        height: vs(200),
        zIndex: -1,
    },
    imagesPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: vs(15)
    },
    imagePreview: {
        width: s(90),
        height: s(55),
        borderRadius: 8,
    },
})