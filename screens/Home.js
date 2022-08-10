import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { NFTCard, FocusedStatusBar, HomeHeader } from "../components";

import { COLORS, NFTData } from "../constants";

const Home = () => {
  //Search functionality

  const [nftData, setNftData] = useState(NFTData);

  const handleSearch = (value) => {
    if (!value.length) {
      return setNftData(NFTData);
    }

    const filteredData = NFTData.filter(
      (item) => item.name.toLowerCase().includes(value.toLowerCase()) //zjistuje jestli zadany string v searchi obsahuje string ktery matchuje pokud nejaky string matchuje string v NFTData tak ho prida do filteredData
    ); //filter func is same as foreach

    if (filteredData.length) {
      //jestlize maj filteredData nejaky string tak se hodi do NFTData a zobrazi se dane nft
      setNftData(filteredData);
    } else {
      setNftData(NFTData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false} //hiding scrollbar
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
            renderItem={({ item }) => <NFTCard data={item} />}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
