import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductGrid from './ProductGrid';
import { useCart } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../context/CartContext', () => ({
    useCart: vi.fn()
}));

vi.spyOn(window, 'confirm');
vi.spyOn(window, 'alert');

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('ProductGrid - Fonctionnalités du Panier', () => {
    const mockAddToCart = vi.fn();
    const produitTest = {
        id: 1,
        nom: 'Produit Test',
        prix: 100,
        image: 'test.jpg'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        useCart.mockReturnValue({ addToCart: mockAddToCart });
    });

    it('devrait ajouter le produit au panier quand l\'utilisateur est connecté', () => {
        localStorage.getItem.mockReturnValue('fake-token');

        render(
            <BrowserRouter>
                <ProductGrid products={[produitTest]} />
            </BrowserRouter>
        );

        const boutonAjoutPanier = screen.getAllByRole('button')[0];
        fireEvent.click(boutonAjoutPanier);

        expect(mockAddToCart).toHaveBeenCalledWith(produitTest);
        expect(window.alert).toHaveBeenCalledWith('Produit ajouté au panier !');
    });

    it('devrait demander de se connecter quand l\'utilisateur n\'est pas connecté', () => {
        localStorage.getItem.mockReturnValue(null);
        window.confirm.mockReturnValue(true);

        render(
            <BrowserRouter>
                <ProductGrid products={[produitTest]} />
            </BrowserRouter>
        );

        const boutonAjoutPanier = screen.getAllByRole('button')[0];
        fireEvent.click(boutonAjoutPanier);

        expect(window.confirm).toHaveBeenCalledWith(
            'Vous devez être connecté pour ajouter des articles au panier. Voulez-vous vous connecter ?'
        );
        expect(mockNavigate).toHaveBeenCalledWith('/login');
        expect(mockAddToCart).not.toHaveBeenCalled();
    });

    it('ne devrait pas rediriger vers la page de connexion si l\'utilisateur annule', () => {
        localStorage.getItem.mockReturnValue(null);
        window.confirm.mockReturnValue(false);

        render(
            <BrowserRouter>
                <ProductGrid products={[produitTest]} />
            </BrowserRouter>
        );

        const boutonAjoutPanier = screen.getAllByRole('button')[0];
        fireEvent.click(boutonAjoutPanier);

        expect(window.confirm).toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(mockAddToCart).not.toHaveBeenCalled();
    });

    it('devrait afficher correctement les produits passés en props', () => {
        render(
            <BrowserRouter>
                <ProductGrid products={[produitTest]} />
            </BrowserRouter>
        );

        expect(screen.getByText('Produit Test')).toBeDefined();
        expect(screen.getByText(/100€/)).toBeDefined();
        expect(screen.getByText(/voir plus/i)).toBeDefined();
    });
});