import { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';

export default function InventoryScreen() {
  const [items, setItems] = useState([
    { id: '1', name: 'Escudo', desc: 'Defesa +10', img: 'https://img.icons8.com/color/1200/shield.jpg' },
    { id: '2', name: 'Espada de Diamante', desc: 'Dano de Ataque +8', img: 'https://img.icons8.com/color/1200/minecraft-sword.jpg' },
    { id: '3', name: 'Poção de Vida', desc: 'Cura 50 HP', img: 'https://img.icons8.com/color/1200/potion.jpg' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setName(item.name);
      setDesc(item.desc);
      setImg(item.img);
    } else {
      setEditingItem(null);
      setName('');
      setDesc('');
      setImg('');
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!name || !desc || !img) {
      Alert.alert("Erro", "Por favor, preencha todos os campos dummy.");
      return;
    }

    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...i, name, desc, img } : i));
    } else {
      const newItem = {
        id: Math.random().toString(),
        name,
        desc,
        img
      };
      setItems([...items, newItem]);
    }

    setModalVisible(false);
  };

  const handleDelete = () => {
    if (!editingItem) return;

    Alert.alert(
      "Excluir Item",
      `Tem certeza que deseja excluir ${editingItem.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => {
            setItems(items.filter(i => i.id !== editingItem.id));
            setModalVisible(false);
          } 
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
        style={styles.gridItem} 
        onPress={() => openModal(item)}
    >
      <Image source={{ uri: item.img }} style={styles.itemImg} />
      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={items} 
        renderItem={renderItem} 
        keyExtractor={item => item.id} 
        numColumns={3} 
        contentContainerStyle={{ paddingBottom: 100 }} 
      />
      
      <TouchableOpacity style={styles.mainAddBtn} onPress={() => openModal()}>
        <Text style={styles.addBtnText}>Novo Item</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                    {editingItem ? `Editar: ${editingItem.name}` : 'Novo Item'}
                </Text>
                {editingItem && (
                    <TouchableOpacity onPress={handleDelete} style={styles.headerDelBtn}>
                        <Text style={{fontSize: 20}}>🗑️</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={{marginBottom: 15}}>
                <Text style={{color: '#aaa', fontSize: 13, marginBottom: 5, fontWeight: 'bold', marginLeft: 5}}>Nome do Item</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>

            <View style={{marginBottom: 15}}>
                <Text style={{color: '#aaa', fontSize: 13, marginBottom: 5, fontWeight: 'bold', marginLeft: 5}}>Descrição</Text>
                <TextInput style={styles.input} value={desc} onChangeText={setDesc} />
            </View>

            <View style={{marginBottom: 15}}>
                <Text style={{color: '#aaa', fontSize: 13, marginBottom: 5, fontWeight: 'bold', marginLeft: 5}}>URL da Imagem</Text>
                <TextInput style={styles.input} value={img} onChangeText={setImg} />
            </View>
            
            <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
                <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#9b59b6'}]} onPress={handleSave}>
                    <Text style={styles.btnTextStyle}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, {backgroundColor: '#444'}]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.btnTextStyle}>Cancelar</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  
  gridItem: { 
    flex: 1, margin: 5, height: 110, backgroundColor: '#1f1f1f', 
    borderRadius: 15, alignItems: 'center', justifyContent: 'center', 
    borderWidth: 1, borderColor: '#333',
    elevation: 3, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.3, shadowRadius: 2
  },
  itemImg: { width: 55, height: 55, resizeMode: 'contain' },
  itemName: { color: '#eee', fontSize: 12, marginTop: 8, fontWeight: '500', paddingHorizontal: 5 },
  
  mainAddBtn: { 
    position: 'absolute', bottom: 20, left: 20, right: 20,
    backgroundColor: '#9b59b6', padding: 18, borderRadius: 12, 
    alignItems: 'center', elevation: 5 
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#222', padding: 25, borderRadius: 25, borderWidth: 1, borderColor: '#444' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerDelBtn: { padding: 5, backgroundColor: 'rgba(231, 76, 60, 0.2)', borderRadius: 8 },
  
  input: { backgroundColor: '#333', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 12, fontSize: 16 },
  modalBtn: { flex: 1, padding: 16, borderRadius: 10, alignItems: 'center' },
  btnTextStyle: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});