const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Cliente', // Nombre de la entidad, se usa en el código.
  tableName: 'clientes', // Nombre de la tabla en la base de datos.
  columns: {
    identidad_clientes: {
      primary: true,
      type: 'bigint',
      unsigned: true
    },
    carpeta: {
      type: 'varchar',
      length: 30
    },
    tipo_iden: {
      type: 'varchar',
      length: 30
    },
    nombres: {
      type: 'varchar',
      length: 100
    },
    apellidos: {
      type: 'varchar',
      length: 30
    },
    direccion_res: {
      type: 'varchar',
      length: 255
    },
    telefono_1: {
      type: 'varchar',
      length: 30
    },
    telefono_res: {
      type: 'varchar',
      length: 30,
      nullable: true
    },
    telefono_2: {
      type: 'varchar',
      length: 30,
      nullable: true
    },
    telefono_3: {
      type: 'varchar',
      length: 30,
      nullable: true
    },
    ciudad_res: {
      type: 'varchar',
      length: 30,
      nullable: true
    },
    direccion_ofi: {
      type: 'varchar',
      length: 30,
      nullable: true
    },
    email: {
      type: 'varchar',
      length: 255,
      nullable: true
    },
    grupo: {
      type: 'varchar',
      length: 30
    },
    genero: {
      type: 'varchar',
      length: 30
    },
    fecha_nac: {
      type: 'varchar',
      length: 30
    },
    tipo_pension: {
      type: 'varchar',
      length: 30
    },
    tipo_iden_pen: {
      type: 'varchar',
      length: 30
    },
    identidad_pen: {
      type: 'int',
      unsigned: true
    },
    nombre_pen: {
      type: 'varchar',
      length: 255
    },
    fecha_rec: {
      type: 'varchar',
      length: 30
    },
    mesada: {
      type: 'varchar',
      length: 30
    },
    retroactivo: {
      type: 'varchar',
      length: 30
    },
    fecha_falle: {
      type: 'varchar',
      length: 30
    },
    pen_empresa: {
      type: 'varchar',
      length: 30
    },
    pen_iss: {
      type: 'varchar',
      length: 30
    },
    salario: {
      type: 'varchar',
      length: 30
    },
    semanas: {
      type: 'varchar',
      length: 30
    },
    
    suspen_tipoIdentidad: {
      type: 'varchar',
      length: 30
    },
    suspen_numeroIdentidad: {
      type: 'bigint', // O 'varchar' si el número de identidad incluye caracteres no numéricos
      unsigned: true
    },
    suspen_nombreCompleto: {
      type: 'varchar',
      length: 255
    },
    suspen_fechaReconocimiento: {
      type: 'varchar',
      length: 30
    },
    suspen_mesadaInicial: {
      type: 'varchar', // O 'decimal' si necesitas almacenar valores con decimales
      length: 30
    },
    suspen_retroactivoPagado: {
      type: 'varchar', // O 'decimal' si necesitas almacenar valores con decimales
      length: 30
    },
    suspen_fechaFallecimientoAfiliado: {
      type: 'varchar',
      length: 30
    },
  }
});
