import { useEffect, useState } from "react";
import { GetLesion } from "../api/MH/GetLesion";
import { getData } from "../components/LocalStorage";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import useLesionStore from "../store/LesionStore";

const daysOfWeek = [
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "Пʼятниця",
];

interface Lesson {
    urok: string;
    time: string;
}

type ScheduleDay = Lesson[];

const Schedule = () => {
    const [openDays, setOpenDays] = useState<{ [key: number]: boolean }>({});
    const setLesions = useLesionStore((state) => state.setLesions);
    const Lesion = useLesionStore((state) => state.lesion);
    const [Le,setLe] = useState<ScheduleDay[]>([])
    
    const toggleDay = (index: number) => {
        setOpenDays((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };  
    useEffect(()=>{
        let d = Lesion;
        d.pop()
        d.pop()
        setLe(d)
    },[])

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {Array.isArray(Le) && Le.map((day: ScheduleDay, index: number) => (
                <View key={index} style={styles.daySection}>
                    <TouchableOpacity
                        onPress={() => toggleDay(index)}
                        style={[
                            styles.dayHeader,
                            openDays[index] && styles.dayHeaderActive,
                        ]}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.dayTitle}>
                            {daysOfWeek[index] || `День ${index + 1}`}
                        </Text>
                        <Text style={styles.arrow}>
                            {openDays[index] ? "▲" : "▼"}
                        </Text>
                    </TouchableOpacity>
                    {openDays[index] && (
                        <View style={styles.cardsWrapper}>
                            {day.map((urok: Lesson, lessonIndex: number) => (
                                <View key={lessonIndex} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.lessonTitle}>{urok.urok}</Text>
                                        <Text style={styles.timeValue}>{urok.time}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            ))}
            {Array.isArray(Lesion) && Lesion.length === 0 && (
                <Text style={styles.emptyText}>На даний момент уроків немає.</Text>
            )}
        </ScrollView>
    );
};
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#f7f7f7",
            padding: 12,
        },
        daySection: {
            marginBottom: 16,
            borderRadius: 12,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
        },
        dayHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 18,
            borderTopLeftRadius: 12,
            borderRadius: 12,
            backgroundColor: "#2c4169",
        },
        dayHeaderActive: {
            backgroundColor: "#192743",
        },
        dayTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: "#ffffff",
        },
        arrow: {
            fontSize: 18,
            color: "#888",
        },
        cardsWrapper: {
            paddingHorizontal: 12,
            paddingBottom: 12,
            backgroundColor: "#fff",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
        },
        card: {
            backgroundColor: "#efeff7",
            borderRadius: 10,
            padding: 12,
            marginTop: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        cardHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        lessonTitle: {
            fontSize: 16,
            fontWeight: "500",
            color: "#222222",
        },
        timeValue: {
            fontSize: 15,
            color: "#040404",
            fontWeight: "600",
        },
        emptyText: {
            textAlign: "center",
            marginTop: 40,
            color: "#aaa",
            fontSize: 16,
        },
        });
    
    export default Schedule;
