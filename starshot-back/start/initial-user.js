const UserModel = use('App/Models/User');
const Hash = use('Hash')
const InitialUser = async () => {   
    const count = await UserModel.countDocuments()

    if (count === 0) {
        const username = 'test-dev'
        const password = await Hash.make('starshot-dev')

        await UserModel.create({
            username,
            password
        })
    }
}

InitialUser()