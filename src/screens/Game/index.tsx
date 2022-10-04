import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { Heading } from "../../components/Heading";

import { THEME } from "../../theme";
import { styles } from './styles';

export function Game() {
  const route = useRoute();
  const navigation = useNavigation()
  const game = route.params as GameParams;
  const [duos, setDuos] = useState<DuoCardProps[]>([])

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://172.20.10.4:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar"
        />

        <FlatList
          style={styles.containerList}
          horizontal
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => { }}
            />
          )}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}