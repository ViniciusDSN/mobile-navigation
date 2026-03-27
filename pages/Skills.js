import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';

export default function SkillsScreen() {
  const [skills, setSkills] = useState([
    { id: '1', name: 'Explosão Estelar', damage: '120', element: 'Fogo', emoji: '🔥' },
    { id: '2', name: 'Corte de Gelo', damage: '85', element: 'Gelo', emoji: '❄️' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [name, setName] = useState('');
  const [damage, setDamage] = useState('');
  const [element, setElement] = useState('');
  const [emoji, setEmoji] = useState('');

  const openModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setName(skill.name);
      setDamage(skill.damage);
      setElement(skill.element);
      setEmoji(skill.emoji);
    } else {
      setEditingSkill(null);
      setName(''); setDamage(''); setElement(''); setEmoji('');
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (editingSkill) {
      setSkills(skills.map(s => s.id === editingSkill.id ? { ...s, name, damage, element, emoji } : s));
    } else {
      setSkills([...skills, { id: Math.random().toString(), name, damage, element, emoji }]);
    }
    setModalVisible(false);
  };

  const deleteSkill = (id) => {
    Alert.alert("Excluir", "Deseja deletar esta habilidade?", [
      { text: "Cancelar" },
      { text: "Excluir", style: "destructive", onPress: () => { setSkills(skills.filter(s => s.id !== id)); setModalVisible(false); } }
    ]);
  };

  const renderSkill = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <View style={{ flex: 1 }}>
        <Text style={styles.skillTitle}>{item.emoji} {item.name}</Text>
        <Text style={styles.skillSubtitle}>Dano: {item.damage} | {item.element}</Text>
      </View>
      <Text style={{ color: '#555' }}>✏️</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={skills} renderItem={renderSkill} keyExtractor={item => item.id} />
      
      <TouchableOpacity style={styles.addBtn} onPress={() => openModal()}>
        <Text style={styles.addBtnText}>Nova Skill</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingSkill ? 'Editar Skill' : 'Nova Skill'}</Text>
              {editingSkill && (
                <TouchableOpacity onPress={() => deleteSkill(editingSkill.id)}><Text style={{fontSize: 20}}>🗑️</Text></TouchableOpacity>
              )}
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome da Habilidade</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>

            <View style={styles.row}>
               <View style={styles.flex1}>
                   <Text style={styles.inputLabel}>Dano Base</Text>
                   <TextInput keyboardType="numeric" style={styles.input} value={damage} onChangeText={setDamage} />
               </View>
               <View style={styles.flex1}>
                   <Text style={styles.inputLabel}>Ícone (Emoji)</Text>
                   <TextInput style={styles.input} value={emoji} onChangeText={setEmoji} />
               </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Elemento (ex: Fogo, Vento)</Text>
                <TextInput style={styles.input} value={element} onChangeText={setElement} />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#9b59b6' }]} onPress={handleSave}>
                  <Text style={{ fontWeight: 'bold', color: '#fff' }}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#444' }]} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#fff' }}>Sair</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 15 },
  card: { flexDirection: 'row', backgroundColor: '#252525', padding: 15, borderRadius: 12, marginBottom: 10, alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#9b59b6' }, // Mudei a bordinha para roxo
  skillTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  skillSubtitle: { color: '#aaa', fontSize: 14 },
  addBtn: { backgroundColor: '#9b59b6', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 }, // Mudei para roxo
  addBtnText: { fontWeight: 'bold', color: '#fff' },
  
  // Estilos do Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#222', padding: 25, borderRadius: 25, borderWidth: 1, borderColor: '#444' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  
  // Estilos de Inputs e Labels
  inputGroup: { marginBottom: 15 },
  inputLabel: { color: '#aaa', fontSize: 13, marginBottom: 5, fontWeight: 'bold', marginLeft: 5 },
  input: { backgroundColor: '#333', color: '#fff', padding: 12, borderRadius: 8 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  flex1: { flex: 1 },
  
  // Botões
  modalButtons: { flexDirection: 'row', gap: 10, marginTop: 10 },
  btn: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center' }
});