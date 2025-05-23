import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { GetHomeWork } from '../api/MH/GetHomeWork';
import { gstyles } from '../styles/gstyles';
import FullScreenModal from '../components/Modal';
import useHomeWorkStore from '../store/HomeWorkStore';
import Home from './Home';

interface HomeworkItem {
    Dalykas?: string;
    MokytojoVardasPavarde?: string;
    AtliktiIki?: string;
    PamokosData?: string;
    UzduotiesAprasymas?: string;
}

export default function HomeWork() {
    const exemple: HomeworkItem = {
        Dalykas: undefined,
        MokytojoVardasPavarde: undefined,
        AtliktiIki: undefined,
        PamokosData: undefined,
        UzduotiesAprasymas: undefined,
    };
    const [List, SetList] = useState<HomeworkItem[]>([]);
    const [Select, SetSelect] = useState<HomeworkItem | null>(null);
    const { width } = useWindowDimensions();

    const HomeWork = useHomeWorkStore((state) => state.HomeWork);

    useEffect(() => {
        SetList(HomeWork);
    }, [HomeWork]);

    const containsHTML = (str: string) => typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str);
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


    return (
        <>
            <View style={styles.container}>
                <FullScreenModal onClose={() => SetSelect(null)} visible={!!Select}>
                    <Text style={[styles.label,{fontSize:30}]}>{Select?.Dalykas ?? ''}</Text>
                    <Text style={styles.label}>{Select?.PamokosData ?`Задано: ${formatDate(Select.PamokosData)}` : ''}</Text>
                    <Text style={styles.label}>{Select?.AtliktiIki ? `Кінцева дата здачі: ${formatDate(Select.AtliktiIki)}` : ''}</Text>
                    <Text style={{fontSize:15,marginTop:30}}>
                        {Select?.UzduotiesAprasymas
                            ? containsHTML(Select.UzduotiesAprasymas)
                                ? <RenderHTML
                                    contentWidth={width}
                                    source={{ html: Select.UzduotiesAprasymas }}
                                    baseStyle={styles.value}
                                    ignoredDomTags={['o:p']}
                                />
                                : Select.UzduotiesAprasymas
                            : '...'}
                    </Text>
                </FullScreenModal>

                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {List.map((el, index) => (
                        <Pressable onPress={() => SetSelect(el)} key={index} style={styles.card}>
                            <Text style={styles.label}>{el.Dalykas ?? ''}</Text>
                            {el.UzduotiesAprasymas && containsHTML(el.UzduotiesAprasymas) ? (
                                <RenderHTML
                                    contentWidth={width}
                                    source={{ html: el.UzduotiesAprasymas }}
                                    baseStyle={styles.value}
                                    ignoredDomTags={['o:p']}
                                />
                            ) : (
                                <Text style={styles.value}>{el.UzduotiesAprasymas ?? '...'}</Text>
                            )}
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            <StatusBar style="auto" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor: '#f4f6f9',
    },
    contentContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
});
