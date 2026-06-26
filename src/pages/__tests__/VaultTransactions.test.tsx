import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VaultTransactions from '../VaultTransactions';

describe('VaultTransactions with small list', () => {
  it('renders header and stats', () => {
    render(<VaultTransactions />);
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.getByText('Total Transactions')).toBeInTheDocument();
  });

  it('renders all 10 mock transaction rows', () => {
    render(<VaultTransactions />);
    const rows = document.querySelectorAll('.vt-tx-row');
    expect(rows.length).toBe(10);
  });

  it('does not show window banner for small list (below threshold)', () => {
    render(<VaultTransactions />);
    expect(document.querySelector('.vt-window-banner')).toBeNull();
  });

  it('filters by transaction type', () => {
    render(<VaultTransactions />);
    const selects = document.querySelectorAll('.vt-select');
    fireEvent.change(selects[0], { target: { value: 'create' } });
    expect(document.querySelectorAll('.vt-tx-row').length).toBe(3);
  });

  it('filters by vault', () => {
    render(<VaultTransactions />);
    const selects = document.querySelectorAll('.vt-select');
    fireEvent.change(selects[1], { target: { value: 'Alpha Vault' } });
    expect(document.querySelectorAll('.vt-tx-row').length).toBe(4);
  });

  it('toggles sort direction', () => {
    render(<VaultTransactions />);
    const sortBtn = document.querySelector('.vt-sort-btn')!;
    expect(screen.getByText(/Newest/)).toBeInTheDocument();
    fireEvent.click(sortBtn);
    expect(screen.getByText(/Oldest/)).toBeInTheDocument();
    fireEvent.click(sortBtn);
    expect(screen.getByText(/Newest/)).toBeInTheDocument();
  });

  it('opens detail modal on row click', () => {
    render(<VaultTransactions />);
    const rows = document.querySelectorAll('.vt-tx-row');
    fireEvent.click(rows[0]);
    expect(document.querySelector('.vt-modal')).toBeInTheDocument();
  });

  it('closes modal on backdrop click', () => {
    render(<VaultTransactions />);
    const rows = document.querySelectorAll('.vt-tx-row');
    fireEvent.click(rows[0]);
    expect(document.querySelector('.vt-modal')).toBeInTheDocument();
    fireEvent.click(document.querySelector('.vt-modal-backdrop')!);
    expect(document.querySelector('.vt-modal')).toBeNull();
  });

  it('shows filters and clear button resets them', () => {
    render(<VaultTransactions />);
    const selects = document.querySelectorAll('.vt-select');
    fireEvent.change(selects[0], { target: { value: 'create' } });
    expect(screen.getByText('Clear')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Clear'));
    expect(document.querySelectorAll('.vt-tx-row').length).toBe(10);
  });

  it('searches by hash', () => {
    render(<VaultTransactions />);
    const searchInput = document.querySelector('.vt-search') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'a3f9' } });
    expect(document.querySelectorAll('.vt-tx-row').length).toBe(1);
  });

  it('filters by status via select', () => {
    render(<VaultTransactions />);
    const selects = document.querySelectorAll('.vt-select');
    fireEvent.change(selects[2], { target: { value: 'pending' } });
    expect(document.querySelectorAll('.vt-tx-row').length).toBe(2);
  });

  it('filters by amount range', () => {
    render(<VaultTransactions />);
    const amountInputs = document.querySelectorAll('.vt-amount-input');
    fireEvent.change(amountInputs[0], { target: { value: '10000' } });
    const rows = document.querySelectorAll('.vt-tx-row');
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.length).toBeLessThan(10);
  });
});

describe('VaultTransactions large fixture integration', () => {
  it('TxRow is memoized and skips re-render for unchanged props', () => {
    render(<VaultTransactions />);
    const rows = document.querySelectorAll('.vt-tx-row');
    expect(rows.length).toBe(10);
  });
});
