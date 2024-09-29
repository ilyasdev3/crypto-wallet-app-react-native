import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/components/reuseable/Avatar";
import WalletCard from "@/components/WalletCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_WALLET } from "../../lib/graphql/wallet/wallet.queries";
import QRCode from "react-native-qrcode-svg";
import ButtonsSection from "@/components/ButtonsSection";
import { TRANSFER_FUNDS } from "@/lib/graphql/wallet/wallet.mutations";

const Page = () => {
  const {
    loading,
    error,
    data: walletData,
    refetch,
  } = useQuery(GET_WALLET, {
    fetchPolicy: "no-cache",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const [transferFunds, { loading: transferLoading }] = useMutation(
    TRANSFER_FUNDS,
    {
      onCompleted: (data) => {
        console.log("Transfer successful:", data);
        setTimeout(() => refetch(), 10000);
        Alert.alert("Success", "Transfer successful.");
      },
      onError: (error) => {
        console.error("Error transferring funds:", error);
      },
    }
  );

  const data = walletData?.getWallet;

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Error loading data</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const walletAddress = data?.address || "N/A";

  const handleTransfer = () => {
    if (!amount || !recipientAddress) {
      console.log("Please enter an amount and recipient address");
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    if (Number(amount) < 0) {
      console.log("Amount must be greater than 0");
      Alert.alert("Error", "Amount must be greater than 0.");
      return;
    }
    if (Number(amount) > Number(data?.balance)) {
      console.log("Insufficient balance");
      Alert.alert("Error", "Insufficient balance.");
      return;
    }
    if (recipientAddress.length !== 42) {
      console.log("Invalid recipient address");
      Alert.alert("Error", "Invalid recipient address.");
      return;
    }

    transferFunds({
      variables: {
        transferFunds: {
          amount,
          address: recipientAddress,
        },
      },
    });
    setModalVisible(false);
    setRecipientAddress("");
    setAmount("");
  };

  return (
    <SafeAreaView className="">
      <ScrollView className="h-screen w-screen bg-[#FFFFFF] p-4 flex flex-col gap-y-8">
        {/* Header Section */}
        <View className="flex-1">
          <Text className="text-3xl font-bold mb-4">My Wallet</Text>

          {/* Wallet Card */}
          <WalletCard data={data} />

          {/* Wallet Address Section */}
          <View className="bg-[#EAF7EE] p-4 rounded-lg mt-4">
            <Text className="text-lg font-bold">Wallet Address</Text>
            <Text className="text-xs text-gray-500 my-2">{walletAddress}</Text>
            <TouchableOpacity
              onPress={() => console.log("Address copied:", walletAddress)}
              className="bg-green-500 p-2 rounded-md"
            >
              <Text className="text-white text-center">Copy Address</Text>
            </TouchableOpacity>
          </View>

          {/* QR Code for Wallet Address */}
          <View className="mt-4 items-center">
            <QRCode value={walletAddress} size={150} />
            <Text className="mt-2 text-sm text-gray-500">
              Scan to share wallet address
            </Text>
          </View>
        </View>
        <ButtonsSection setModalVisible={setModalVisible} />
      </ScrollView>

      {/* Transfer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text className="text-xl font-bold mb-4">Transfer Funds</Text>
            <TextInput
              placeholder="Recipient Address"
              value={recipientAddress}
              onChangeText={setRecipientAddress}
              style={styles.input}
            />
            <TextInput
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleTransfer}
                className="bg-green-500 p-2 rounded-md"
              >
                <Text className="text-white text-center">Confirm Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-red-500 p-2 rounded-md"
              >
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background for the modal
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Set the width of the modal
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Page;
