function burndownData() {
  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: i });
    cos.push({x: i, y: (i*2)/5 });
  }

  return [
    {
      values: sin,
      key: 'Current Velocity',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Target Velocity',
      color: '#2ca02c'
    }
  ];
}
