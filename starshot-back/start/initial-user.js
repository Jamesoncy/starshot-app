const UserModel = use('App/Models/User');
const InitialUser = async () => {
    const count = await UserModel.getCount()
    if (count === 0) {
        const user = new UserModel()
        
        user.username = 'test-dev'
        user.password = 'starshot-dev'
        await user.save()
    }
}

InitialUser()