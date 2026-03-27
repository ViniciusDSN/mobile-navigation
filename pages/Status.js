import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';

const ProgressBar = ({ label, value, max, color }) => (
  <View style={styles.barContainer}>
    <Text style={styles.barLabel}>{label}: {value}/{max}</Text>
    <View style={styles.barBackground}>
      <View style={[styles.barFill, { width: `${Math.min(100, (value / max) * 100)}%`, backgroundColor: color }]} />
    </View>
  </View>
);

export default function StatusScreen() {
  const [char, setChar] = useState({
    name: 'UOOOOARGH',
    img: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnNuN2djd2QzdGlxcmxmajFmZnFubGFnYmljc2ZsNWNocHZwZWliZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BxXYI0SBorAcl7okoq/giphy.gif',
    hp: 90, maxHp: 100,
    mp: 30, maxMp: 50,
    sanity: 75, maxSanity: 100
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ ...char });

  const saveStatus = () => {
    setChar({ ...form });
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: char.img }} style={styles.avatar} />
        <TouchableOpacity style={styles.editCharBtn} onPress={() => { setForm({...char}); setModalVisible(true); }}>
          <Text style={{fontSize: 16}}>✏️ Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{char.name}</Text>

      <View style={styles.statsWrapper}>
        <ProgressBar label="Vida" value={char.hp} max={char.maxHp} color="#ff4d4d" />
        <ProgressBar label="Mana" value={char.mp} max={char.maxMp} color="#4d94ff" />
        <ProgressBar label="Sanidade" value={char.sanity} max={char.maxSanity} color="#9b59b6" />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Atributos</Text>
            
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome do Personagem</Text>
                <TextInput style={styles.input} value={form.name} onChangeText={(t) => setForm({...form, name: t})} />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>URL da Imagem</Text>
                <TextInput style={styles.input} value={form.img} onChangeText={(t) => setForm({...form, img: t})} />
            </View>
            
            <View style={styles.row}>
               <View style={styles.flex1}>
                   <Text style={styles.inputLabel}>HP Atual</Text>
                   <TextInput keyboardType="numeric" style={styles.input} value={String(form.hp)} onChangeText={(t) => setForm({...form, hp: Number(t)})} />
               </View>
               <View style={styles.flex1}>
                   <Text style={styles.inputLabel}>HP Máximo</Text>
                   <TextInput keyboardType="numeric" style={styles.input} value={String(form.maxHp)} onChangeText={(t) => setForm({...form, maxHp: Number(t)})} />
               </View>
            </View>

            <View style={styles.row}>
               <View style={styles.flex1}>
                   <Text style={styles.inputLabel}>Mana Atual</Text>
                   <TextInput keyboardType="numeric" style={styles.input} value={String(form.mp)} onChangeText={(t) => setForm({...form, mp: Number(t)})} />
               </View>
               <View style={styles.flex1}>
                   <Text style={styles.inputLabel}>Mana Máxima</Text>
                   <TextInput keyboardType="numeric" style={styles.input} value={String(form.maxMp)} onChangeText={(t) => setForm({...form, maxMp: Number(t)})} />
               </View>
            </View>

            <View style={styles.row}>
               <View style={styles.flex1}>
                   <Text style={styles.inputLabel}>Sanidade Atual</Text>
                   <TextInput keyboardType="numeric" style={styles.input} value={String(form.sanity)} onChangeText={(t) => setForm({...form, sanity: Number(t)})} />
               </View>
               <View style={styles.flex1}>
                   <Text style={styles.inputLabel}>Sanidade Max</Text>
                   <TextInput keyboardType="numeric" style={styles.input} value={String(form.maxSanity)} onChangeText={(t) => setForm({...form, maxSanity: Number(t)})} />
               </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#9b59b6' }]} onPress={saveStatus}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar Tudo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#444' }]} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#fff' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#121212', padding: 20, minHeight: '100%' },
  header: { alignItems: 'center', marginBottom: 10 },
  avatar: { width: 160, height: 160, borderRadius: 80, borderWidth: 3, borderColor: '#9b59b6', marginBottom: 10 },
  editCharBtn: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 30, textAlign: 'center' },
  statsWrapper: { width: '100%', gap: 10 },
  barContainer: { width: '100%', marginBottom: 15 },
  barLabel: { color: '#ccc', marginBottom: 5, fontWeight: 'bold' },
  barBackground: { height: 18, backgroundColor: '#333', borderRadius: 10, overflow: 'hidden' },
  barFill: { height: '100%' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#222', padding: 20, borderRadius: 20 },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  
  inputGroup: { marginBottom: 15 },
  inputLabel: { color: '#aaa', fontSize: 13, marginBottom: 5, fontWeight: 'bold', marginLeft: 5 },
  input: { backgroundColor: '#333', color: '#fff', padding: 12, borderRadius: 8 },
  row: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  flex1: { flex: 1 },
  
  modalButtons: { flexDirection: 'row', gap: 10, marginTop: 10 },
  btn: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center' }
});