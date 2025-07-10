import axios from 'axios'

export class ApiService {
  static async getProduits() {
    try {
      const response = await axios.get('/api/produits')
      return response.data
    } catch (error) {
      console.error('Erreur API:', error)
      return [
        { id: 1, nom: 'Produit 1', prix: 19.99, description: 'Description 1' },
        { id: 2, nom: 'Produit 2', prix: 29.99, description: 'Description 2' },
        { id: 3, nom: 'Produit 3', prix: 39.99, description: 'Description 3' }
      ]
    }
  }

  static async chargerPageProduits() {
    try {
      const produits = await this.getProduits()
      return {
        success: true,
        data: produits,
        affichage: 'grille'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}