## Entregable Trabajo Practico N3 Base de Datos 3


_Aggregations_


  [
  {
    '$match': {
      'precio': {
        '$gt': 0
      }
    }
  }, {
    '$project': {
      'categoria': 1, 
      'cantidad': 1, 
      'recaudacionVentas': {
        '$multiply': [
          '$cantidad', '$precio'
        ]
      }
    }
  }, {
    '$group': {
      '_id': '$categoria', 
      'totalRecaudado': {
        '$sum': '$recaudacionVentas'
      }, 
      'cantidadItems': {
        '$sum': '$cantidad'
      }
    }
  }, {
    '$match': {
      'totalRecaudado': {
        '$gte': 315
      }
    }
  }, {
    '$sort': {
      'totalRecaudado': -1
    }
  }
]
