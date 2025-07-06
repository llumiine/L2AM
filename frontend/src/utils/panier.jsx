// Logique métier du panier (séparée du composant React)
export class PanierService {
  static ajouterProduit(produit, utilisateur) {
    if (!utilisateur || !utilisateur.connecte) {
      return {
        success: false,
        message: 'Se connecter pour acheter'
      }
    }
    
    // Logique d'ajout au panier
    const panier = JSON.parse(localStorage.getItem('panier') || '[]')
    panier.push(produit)
    localStorage.setItem('panier', JSON.stringify(panier))
    
    return {
      success: true,
      message: 'Produit ajouté au panier'
    }
  }

  static estVisible(utilisateur) {
    return utilisateur && utilisateur.connecte
  }

  static getPanier() {
    return JSON.parse(localStorage.getItem('panier') || '[]')
  }

  static viderPanier() {
    localStorage.removeItem('panier')
  }
}