import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import { gstyles } from '../styles/gstyles';
import { useEffect, useState } from 'react';
import { login } from '../api/MH/login';
import useLoadingStore from '../store/LoadStore';
import { GetLesion } from '../api/MH/GetLesion';
import { getData, removeData, storeData } from '../components/LocalStorage';
import useBalStore from '../store/BalStore';
import useLesionStore from '../store/LesionStore';
import { GetHomeWork } from '../api/MH/GetHomeWork';
import useHomeWorkStore from '../store/HomeWorkStore';
import useProfileStore from '../store/ProfileStore';
import { GetProfil } from '../api/MH/GetProfil';
export default function Home() {
  const load = useLoadingStore((state) => state.load);
  const setLoad = useLoadingStore((state) => state.setLoad);


  const Bal = useBalStore((state) => state.bal);
  const setBal = useBalStore((state) => state.setBal);

  const setHomeWork = useHomeWorkStore((state) => state.SetHomeWork);

  const setLesions = useLesionStore((state) => state.setLesions);

  const setProfile = useProfileStore((state) => state.setProfile);

  const [Menu, setMenu] = useState<Array<any> | []>([]);

  const [Lesion, setLesion] = useState<string | ''>("");
  const [mis, setMis] = useState<number | null>(null);
  const [Sta, SetSta] = useState<boolean | false>(true);
  const [Povidok, setPovidok] = useState<number | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      const logins: string | null = await getData("login");
      const password: string | null = await getData("password");
      if (logins !== null && password !== null) {
        login(logins, password).then((data) => {
          setBal(data[14]);
          setMis(data[15]);
          setPovidok(data[10]);
          setLoad(!load);
        });
        GetLesion(logins, password, true).then((data) => {
          setLesion(data)
        })
        GetLesion(logins, password, false).then((data) => {
          setLesions(data)
        })

        GetHomeWork(logins, password).then((list) => {
          if (list && Array.isArray(list.value)) {
            setHomeWork(list.value);
          } else {
            setHomeWork([]);
          }
        });

        GetProfil(logins, password).then((data) => {
          setProfile(data)
        })

      }
    };
    fetchData();

    if (getData('menu') === null) {
      storeData('menu', JSON.stringify([
        {
          "lable": "📚 Урок зараз",
          "data": Lesion ?? '...'
        }]
      ))

    }
    else {

    }
  }, []);

  const menu = [

    {
      "lable": "📚 Урок зараз",
      "data": Lesion ?? '...'
    },
    {
      "lable": "📬 Повідомлення",
      "data": Povidok ?? '...'
    },
    {
      "lable": "📊 Середній бал",
      "data": Bal ?? '...'
    },
    {
      "lable": "🏅 Місце в класі",
      "data": mis ? `${mis} з 32` : '...'
    }
  ]

  return (
    <>

      <View style={[gstyles.container, styles.wrapper]}>


        <>
          {menu.map((item, index) => (
            <Pressable key={index} style={styles.card}>
              <Text style={styles.label}>{item.lable}</Text>
              <Text style={styles.value}>{item.data}</Text>
            </Pressable>
          ))}


        </>

        <StatusBar style="light" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f4f6f9',
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
    elevation: 4,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
  },
  label: {
    fontSize: 18,
    color: '#888',
    marginBottom: 6,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
});