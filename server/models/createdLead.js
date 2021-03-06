
module.exports = function (sequelize, DataTypes) {
    let CreateLead = sequelize.define('CreateLead', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        customerName: {
            type: DataTypes.STRING(250),
            field: 'customer_name'
        },
        companyName: {
            type: DataTypes.STRING(250),
            field: 'company_name'
        },
        address: {
            type: DataTypes.STRING(250),
            field: 'address'
        },
        city: {
            type: DataTypes.STRING(250),
            field: 'city'
        },
        country: {
            type: DataTypes.STRING(250),
            field: 'country'
        },
        year: {
            type: DataTypes.STRING(250),
            field: 'year'
        },
        customerStatus: {
            type: DataTypes.STRING(250),
            field: 'customer_status'
        },
        state: {
            type: DataTypes.STRING(250),
            field: 'state'
        },
        pincode: {
            type: DataTypes.STRING(250),
            field: 'pincode'
        },
        gstIn: {
            type: DataTypes.STRING(250),
            field: 'gst_in'
        },
        // breakingSizeVariety: {
        //     type: DataTypes.STRING(250),
        //     field: 'breaking_size_variety'
        // },
        type: {
            type: DataTypes.STRING(250),
            field: 'type'
        },
        purpose: {
            type: DataTypes.STRING(250),
            field: 'purpose'
        },
        machineWorkingHours: {
            type: DataTypes.STRING(250),
            field: 'machine_working_hours'
        },
        product: {
            type: DataTypes.STRING(250),
            field: 'product'
        },
        machineMakeModel: {
            type: DataTypes.STRING(250),
            field: 'machine_make_model'
        },
        existingBreaker: {
            type: DataTypes.STRING(250),
            field: 'existing_breaker'
        },
        pipelines:{
            type:DataTypes.STRING(250),
            field:'pipelines',
        },
        source:{
            type:DataTypes.STRING(250),
            field:'source',
        },

        leadAssignedTo:{
            type:DataTypes.STRING(250),
            field:'lead_assigned_to',
        },
        leadAssigned:{
            type:DataTypes.STRING(250),
            field:'lead_assigned',
        },
        convertedStatus:{
            type:DataTypes.STRING(250),
            field:'converted_status',
        },

        
        mobileNo:{
            type:DataTypes.STRING(10),
            field:'mobile_no',
        },
        mobileNo2:{
            type:DataTypes.STRING(10),
            field:'mobile_no2',
        },
        mailId:{
            type:DataTypes.STRING(250),
            field:'mail_id',
        },
        mailId2:{
            type:DataTypes.STRING(250),
            field:'mail_id2',
        },
        
        createdBy: {
            type: DataTypes.STRING(50),
            field: 'created_by'
        },
        recommendedBreaker: {
            type: DataTypes.STRING(50),
            field: 'recommended_breaker'
        },
        updatedBy: {
            type: DataTypes.STRING(50),
            field: 'updated_by'
        },
        deletedBy: {
            type: DataTypes.STRING(50),
            field: 'deleted_by'
        },
        deleteStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'delete_status',
            defaultValue: false
        },

    },
        {
            timestamps: true,
            tableName: 'Create_Lead'
        })

        CreateLead.associate = function (models) {
            CreateLead.hasMany(models.ConvertedLead, { foreignKey: 'createdLeadId' })
            CreateLead.hasMany(models.CustomerProfile, { foreignKey: 'createdLeadId' })
            CreateLead.hasMany(models.Ticket, { foreignKey: 'createdLeadId' })

    }
  
    return CreateLead
}