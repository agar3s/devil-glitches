function checkRecord(){
  if(score<record) return;
  console.log('new record!');
  record = score;
  storage.setItem('agar3sjs13k-record', score);
}