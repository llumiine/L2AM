import React, { useState } from 'react';
import { Users, Package, Settings, BarChart3, ShoppingCart, Eye, Edit, Trash2 } from 'lucide-react';

const Admin = () => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');

    const menuItems = [
        { name: 'Team', icon: Users, active: false },
        { name: 'Dashboard', icon: BarChart3, active: true },
        { name: 'Commandes', icon: ShoppingCart, active: false },
        { name: 'Liste des Commandes', icon: Package, active: false },
        { name: 'Produits', icon: Package, active: false },
        { name: 'Déconnexion', icon: Settings, active: false }
    ];

    const orders = [
        {
            id: 'Commande #5011',
            address: 'Amziali 94250',
            date: '13.09.2023 - 1:25 PM',
            price: '30€',
            status: 'Terminé',
            statusColor: 'bg-green-500'
        },
        {
            id: 'Commande #5010',
            address: 'Paris 75015',
            date: '12.09.2023 - 4:15 PM',
            price: '45€',
            status: 'En cours',
            statusColor: 'bg-yellow-500'
        },
        {
            id: 'Commande #1234',
            address: 'Paris 75008',
            date: '11.09.2023 - 2:45 PM',
            price: '28€',
            status: 'Annulé',
            statusColor: 'bg-red-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-red-400 to-red-500 text-white">
                <div className="p-6">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users size={24} />
                        </div>
                        <h3 className="font-semibold text-lg">Team</h3>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveMenu(item.name)}
                                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                                    activeMenu === item.name
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <item.icon size={20} className="mr-3" />
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Admin</h1>

                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                            <h3 className="text-gray-600 text-sm font-medium mb-2">Total de commande</h3>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-gray-900 mr-3">30</span>
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <ShoppingCart size={20} className="text-yellow-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border">
                            <h3 className="text-gray-600 text-sm font-medium mb-2">Vente total</h3>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-gray-900 mr-3">100€</span>
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <BarChart3 size={20} className="text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-900">Les Commandes</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Commande</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Adresse</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date & Heure</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Prix</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Statut</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.address}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{order.price}</td>
                                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${order.statusColor}`}>
                        {order.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-1 text-green-600 hover:text-green-800 transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-1 text-red-600 hover:text-red-800 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;