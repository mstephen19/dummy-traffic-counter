import path from 'path';
import { Sequelize, Model, DataTypes } from 'sequelize';

export const connection = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(path.resolve(), '../db/dummy.sqlite'),
    database: 'dummy',
});

class Count extends Model {}

Count.init(
    {
        ip: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    },
    {
        sequelize: connection,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tracked_ip_addresses',
    }
);

export default Count;
