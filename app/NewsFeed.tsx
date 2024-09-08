import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Tabs from "@/components/reuseable/Tabs";
import NewsItem from "@/components/reuseable/NewItem";

const NewsFeedPage = () => {
  const tabs = ["Top", "Invest", "Socials", "Market"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="bg-white">
        <View>
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <View>
            <NewsItem
              title="Marathon Digital reports bitcoin holdings $437.4M"
              subtitle="Marathon Digital's (NASDAQ:MARA) mining fleet produced ~2,712.3..."
              source="Seeking Alpha"
              time="an hour ago"
              imageUrl={
                "https://images.unsplash.com/photo-1533910534207-90f31029a78e?q=80&w=3101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <NewsItem
              title="Victory is for the taking in Friday's $950M Bitcoin..."
              subtitle="As the crypto markets move through a period of largely sideways price..."
              source="Seeking Alpha"
              time="an hour ago"
              imageUrl={
                "https://images.unsplash.com/photo-1533910534207-90f31029a78e?q=80&w=3101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <NewsItem
              title="You Should Buy This Bitcoin Dip"
              subtitle="Setting the Framework Bitcoin (BTC-USD) is still in a secular bull market, and I expect higher prices in the..."
              source="Seeking Alpha"
              time="an hour ago"
              imageUrl={
                "https://images.unsplash.com/photo-1533910534207-90f31029a78e?q=80&w=3101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <NewsItem
              title="Marathon Digital reports bitcoin holdings $437.4M"
              subtitle="Marathon Digital's (NASDAQ:MARA) mining fleet produced ~2,712.3..."
              source="Seeking Alpha"
              time="an hour ago"
              imageUrl={
                "https://images.unsplash.com/photo-1533910534207-90f31029a78e?q=80&w=3101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsFeedPage;

const styles = StyleSheet.create({});
